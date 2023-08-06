#-*- encoding: UTF-8 -*-
import sys
from douban.books_api import BooksAPI
from douban.movies_api import MoviesAPI
from clint.arguments import Args
from clint.textui import puts, colored, indent
SPACE = ' '

class DouBanCLI(object):

    @property
    def valid_actions(self):
        return ['book', 'movie']

    # flags are not used yet
    def route(self, action, name, flags):
        if not action in self.valid_actions:
            puts(colored.red('%s is not a valid action' %action))
            exit()

        getattr(self, action)(name)

    def book(self, book_name):
        api = BooksAPI()
        res = api.search_book({'q': book_name, 'count': 1})
        book = self._get_first_matched_id_from(res, 'book')
        self._print_book_info(book)

    def movie(self, movie_name):
        api = MoviesAPI()
        res = api.search_movie({'q': movie_name, 'count': 1})
        movie = self._get_first_matched_id_from(res, 'movie')
        self._print_movie_info(movie)

    def _get_first_matched_id_from(self, res, obj_type='book'):
        count = int(res['total'])
        if count == 0:
            print(u'找不到结果')
            exit()
        else:
            print(u'共%s个结果，返回第1个结果' %res['total'])
            mapper = {'book': 'books', 'movie': 'subjects'}
            key = mapper[obj_type]
            if len(res[key]) >= 1:
                return res[key][0]

    def _print_book_info(self, book):
        if book != None:
            # print(book)
            print(u'')
            print(u'书名: %s' % colored.green(book['title']))
            print(u'')
            print(u'作者: %s' % colored.green(SPACE.join(book['author'])))
            print(u'作者简介: %s' % colored.green(book['author_intro']))
            print(u'')
            print(u'页数: %s' % book['pages'])
            print(u'出版日期: %s' % book['pubdate'])
            print(u'定价: %s' % book['price'])
            self._print_rating(book['rating'])
            self._print_tags(book['tags'])
            if sys.platform == 'win32':
                print(u'简介')
                print(colored.yellow(book['summary'].encode('GBK', 'ignore')))
            else:
                print('简介: %s' %colored.yellow(book['summary']))
            print('')
            # print(u'目录: %s' % book['catalog'])
        else:
            print(u'无法找到相关结果')

    def _print_rating(self, rating, obj_type='book'):
        if obj_type == 'book':
            print(u'共有%s人次评分, 平均分: %s'%(colored.yellow(rating['numRaters']), colored.yellow(rating['average'])))
        else:
            print(u'共有%s人收藏, 平均分: %s'%(colored.yellow(rating['stars']), colored.yellow(rating['average'])))

    def _print_tags(self, tags):
        tag_names = [tag['name'] for tag in tags]
        print(u'标签: %s' % u', '.join(tag_names))

    def _print_movie_info(self, movie):
        if movie != None:
            print(u'名称: %s' % colored.yellow(movie['title']))
            self._print_rating(movie['rating'], 'movie')
            print(u'年份: %s' % movie['year'])
            print(u'类型: %s' % movie['subtype'])
            print(u'导演: %s' % self._get_name(movie['directors']))
            print(u'主演: %s' % self._get_name(movie['casts']))
            print(u'分类: %s' % ' '.join(movie['genres']))
        else:
            print(u'无法找到相关结果')

    def _get_name(self, directors_or_actors):
        return u', '.join([someone['name'] for someone in directors_or_actors])

def fetch_names(grouped_args):
    return SPACE.join(grouped_args[1:])

def main():

    cli = DouBanCLI()

    args = Args()

    # grouped['_'] does not contain flags
    grouped_args = args.grouped['_'].all

    if len(grouped_args) <= 1:
        print(colored.yellow('USAGE: douban book book_name'))
        print(colored.yellow('USAGE: douban movie movie_name'))
    else:
        action = grouped_args[0]
        name = fetch_names(grouped_args)
        show_detail = True if '-d' in args.flags.all else False
        cli.route(action, name, {'show_detail': show_detail})


if __name__ == '__main__':
    main()
