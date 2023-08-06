from django.shortcuts import render
from django.http import Http404
from django.contrib.sites.shortcuts import get_current_site
from csnews_multilingual.models import Article, Tag
from csnews_multilingual.diggpaginator import DiggPaginator
from django.utils.translation import get_language

ARTICLE_NUMBER_PER_PAGE = 20


def _get_page(list, page):
    paginator = DiggPaginator(list, ARTICLE_NUMBER_PER_PAGE, body=5, padding=2)
    try:
        page = int(page)
    except ValueError:
        page = 1

    try:
        tor = paginator.page(page)
    except:
        tor = paginator.page(paginator.num_pages)
    return tor


def index(request):
    articles = Article.objects.language(get_language()).filter(is_public=True)
    page = _get_page(articles, request.GET.get('page', '1'))
    return render(request, 'news/articles.html', locals())


def tag_index(request, tag_slug):
    try:
        obj = Tag.objects.language(get_language()).get(slug=tag_slug)
    except:
        raise Http404
    articles = Article.objects.language(get_language()).filter(tags=obj, is_public=True)
    page = _get_page(articles, request.GET.get('page', '1'))
    return render(request, 'news/articles.html', locals())


def article_index(request, article_slug):
    try:
        site = get_current_site(request)
        obj = Article.objects.language(get_language()).get(slug=article_slug)
    except:
        raise Http404
    return render(request, 'news/article.html', locals())


def archive(request):
    return render(request, 'news/archive.html', locals())
