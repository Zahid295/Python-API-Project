from django import forms
from .models import Post
from django.views.generic import UpdateView


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content', 'author']

class PostUpdateForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content']

#class PostUpdateView(UpdateView):
#    model = Post
#    fields = ['title', 'content', 'author']

#    def form_valid(self, form):
#        form.instance.author = self.request.user
#        return super().form_valid(form)

