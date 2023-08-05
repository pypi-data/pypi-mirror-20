from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.contrib import messages
from django.contrib.admin.views.decorators import staff_member_required
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User

from sshkm.models import Setting
from sshkm.forms import UserForm


@staff_member_required(login_url=None)
def SettingsList(request):
    users = User.objects.exclude(username='admin')
    try:
        privatekey = Setting.objects.get(name='MasterKeyPrivate')
        privatekey = privatekey.value[:50] + "\n...........\n" + privatekey.value[-50:]
    except:
        privatekey = ""

    try:
        publickey = Setting.objects.get(name='MasterKeyPublic')
        publickey = publickey.value
    except:
        publickey = ""

    context = {'users': users, 'privatekey': privatekey, 'publickey': publickey}
    return render(request, 'sshkm/settings/list.html', context)

@staff_member_required(login_url=None)
def PasswordSave(request):
    if request.POST.get('password') != request.POST.get('confirm'):
        messages.add_message(request, messages.ERROR, "Password and Password Confirm are not equal.")
        return HttpResponseRedirect(reverse('SettingsList'))
    else:
        u = User.objects.get(id=request.user.id)
        u.set_password(request.POST.get('password'))
        u.save()
        return HttpResponseRedirect(reverse('logout'))

@staff_member_required(login_url=None)
def CreateUser(request):
    if request.POST.get('password') != request.POST.get('confirm'):
        messages.add_message(request, messages.ERROR, "Password and Password Confirm are not equal.")
        return HttpResponseRedirect(reverse('SettingsList'))
    else:
        user = User.objects.create_user(request.POST.get('username'), '', request.POST.get('password'))
        if request.POST.get('is_staff'):
            user.is_staff = 1
        user.save()
        return HttpResponseRedirect(reverse('SettingsList'))

@staff_member_required(login_url=None)
def DeleteUser(request):
    try:
        if request.POST.get('id_multiple') is not None:
            User.objects.filter(id__in=request.POST.getlist('id_multiple')).delete()
            messages.add_message(request, messages.SUCCESS, "User(s) deleted")
        else:
            user = User.objects.get(id=request.GET['id'])
            delete = User(id=request.GET['id']).delete()
            messages.add_message(request, messages.SUCCESS, "User " + user.username + " deleted")
    except ObjectDoesNotExist as e:
        messages.add_message(request, messages.ERROR, "The user could not be deleted")
    except Exception as e:
        messages.add_message(request, messages.ERROR, "The user could not be deleted")

    return HttpResponseRedirect(reverse('SettingsList'))

@staff_member_required(login_url=None)
def MasterKeyPublic(request):
    try:
        key = Setting.objects.get(name='MasterKeyPublic')
        key.value = request.FILES['publickey'].read()
        key.save()
        messages.add_message(request, messages.SUCCESS, "Key uploaded.")
    except ObjectDoesNotExist as e:
        Setting(name='MasterKeyPublic', value=request.FILES['publickey'].read()).save()
        messages.add_message(request, messages.SUCCESS, "Key uploaded.")
    except Exception as e:
        messages.add_message(request, messages.ERROR, "Key could not be uploaded.")

    return HttpResponseRedirect(reverse('SettingsList'))

@staff_member_required(login_url=None)
def MasterKeyPrivate(request):
    try:
        key = Setting.objects.get(name='MasterKeyPrivate')
        key.value = request.FILES['privatekey'].read()
        key.save()
        messages.add_message(request, messages.SUCCESS, "Key uploaded.")
    except ObjectDoesNotExist as e:
        Setting(name='MasterKeyPrivate', value=request.FILES['privatekey'].read()).save()
        messages.add_message(request, messages.SUCCESS, "Key uploaded.")
    except Exception as e:
        messages.add_message(request, messages.ERROR, "Key could not be uploaded.")

    passphrase = request.POST.get('passphrase')
    if passphrase:
        try:
            p = Setting.objects.get(name='MasterKeyPrivatePassphrase')
            p.value = passphrase
            p.save()
        except:
            Setting(name='MasterKeyPrivatePassphrase', value=passphrase).save()

    return HttpResponseRedirect(reverse('SettingsList'))
