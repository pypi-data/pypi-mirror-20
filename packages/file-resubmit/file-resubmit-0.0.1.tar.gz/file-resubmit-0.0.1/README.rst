django-file-resubmit
====================

In Django project you have forms with FileField, ImageField. Everything works great, but
when ValidationError is raised, you have to reselect all files and images again. It is 
kind of annoying. **file-resubmit** solves this problem.
It works with FileField, ImageField and sorl.thumbnail.ImageField. 

How does it work?
=================

Here are special widgets for FileField and ImageField. When you submit files, every widget 
saves its file in cache. And when ValidationError is raised, widgets restore files from cache. 

 
Installation
============
::
 
     $ pip install file-resubmit
 

Configuration 
=============

Add `"resubmit"` to `INSTALLED_APPS`. ::

    INSTALLED_APPS = {
        ...
        'resubmit',
        ...
    }

Setup cache in settings.py. ::

    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        },
        "resubmit": {
            'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
            "LOCATION": '/tmp/resubmit/'
        },
    
Examples
========

models.py ::

    from django.db import models
    from django.db.models import ImageField
    # or if you use sorl-thumbnail
    # from sorl.thumbnail.fields import ImageField

    class Page(models.Model):
        title = models.CharField(max_length=100)
        content = models.TextField()
        image =  ImageField(upload_to='whatever1')

Admin example
=============

admin.py ::

    from django.contrib import admin
    from resubmit.admin import AdminResubmitMixin
    from .models import Page

    class PageAdmin(AdminResubmitMixin, admin.ModelAdmin):
        pass

    admin.site.register(Page, PageAdmin)
        
Widgets examples
================

models.py::

    from django.forms import ModelForm
    from resubmit.admin import AdminResubmitImageWidget, AdminResubmitFileWidget
    from .models import Page

    class PageModelForm(forms.ModelForm)
    
        class Meta:
            model = MyModel
            widgets = {
                'picture': AdminResubmitImageWidget,
                'file': AdminResubmitFileWidget, 
            }


Licensing
=========

file-resubmit is free software under terms of the MIT License.


**Copyright (C) 2011 by Ilya Shalyapin**, ishalyapin@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
