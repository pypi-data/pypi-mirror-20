from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


# Create your models here.


HTTP_CHOICES = [("post","POST"),("get","GET")]



class ApiParam(models.Model):
    params = models.TextField()

    def __str__(self):
	return self.params


class Api(models.Model):
    url = models.CharField(max_length=200,unique=True)
    desc = models.CharField(max_length=200)
    params = models.ManyToManyField(ApiParam,blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    http_type =  models.CharField(max_length=10,choices = HTTP_CHOICES)
    created =  models.DateTimeField(auto_now=True,null=True,blank=True)
    updated =  models.DateTimeField(auto_now_add=True,null=True,blank=True)
    active = models.BooleanField(default=True)
    user = models.ManyToManyField(User,blank=True)

    def __str__(self):
	return self.url
    def get_params(self):
	params_list = []
	for api_param in self.params.all():
	    param = eval(api_param.params)
	    params_list.append(param)
	return params_list
