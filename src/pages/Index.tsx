import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Anime {
  id: number;
  title: string;
  image: string;
  progress: string;
  episodes: number;
  rating: number;
  genre: string;
  status: 'watching' | 'planned' | 'completed';
  reviews: Review[];
}

interface Review {
  id: number;
  user: string;
  rating: number;
  text: string;
  date: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [newReview, setNewReview] = useState({ rating: 5, text: '' });

  const [animeList, setAnimeList] = useState<Anime[]>([
    {
      id: 1,
      title: 'Тёмное Пророчество',
      image: 'https://cdn.poehali.dev/projects/a314baa9-b207-42f5-b91a-c7404aebbed6/files/5695a5ae-5138-4462-a9e4-9bfe84fffcc7.jpg',
      progress: '0 / 24',
      episodes: 24,
      rating: 4.8,
      genre: 'Фэнтези',
      status: 'watching',
      reviews: [
        { id: 1, user: 'Александр', rating: 5, text: 'Потрясающий сюжет и отличная анимация!', date: '2024-01-15' },
        { id: 2, user: 'Мария', rating: 4, text: 'Интересная история, но местами затянуто.', date: '2024-01-10' }
      ]
    },
    {
      id: 2,
      title: 'Школьные Дни',
      image: 'https://cdn.poehali.dev/projects/a314baa9-b207-42f5-b91a-c7404aebbed6/files/d68dac3d-b3bf-43c0-b7c9-4c85deb7a089.jpg',
      progress: '12 / 12',
      episodes: 12,
      rating: 4.5,
      genre: 'Школа',
      status: 'completed',
      reviews: [
        { id: 3, user: 'Дмитрий', rating: 5, text: 'Очень душевное аниме, напоминает о школьных годах.', date: '2024-01-12' }
      ]
    },
    {
      id: 3,
      title: 'Меч Легенд',
      image: 'https://cdn.poehali.dev/projects/a314baa9-b207-42f5-b91a-c7404aebbed6/files/458fe90f-fad0-440c-9e41-9a13ef1910e4.jpg',
      progress: '0 / 48',
      episodes: 48,
      rating: 4.9,
      genre: 'Экшен',
      status: 'planned',
      reviews: []
    },
    {
      id: 4,
      title: 'Ночной Страж',
      image: 'https://cdn.poehali.dev/projects/a314baa9-b207-42f5-b91a-c7404aebbed6/files/5695a5ae-5138-4462-a9e4-9bfe84fffcc7.jpg',
      progress: '5 / 24',
      episodes: 24,
      rating: 4.6,
      genre: 'Триллер',
      status: 'watching',
      reviews: []
    },
    {
      id: 5,
      title: 'Летняя История',
      image: 'https://cdn.poehali.dev/projects/a314baa9-b207-42f5-b91a-c7404aebbed6/files/d68dac3d-b3bf-43c0-b7c9-4c85deb7a089.jpg',
      progress: '0 / 12',
      episodes: 12,
      rating: 4.3,
      genre: 'Романтика',
      status: 'planned',
      reviews: []
    },
    {
      id: 6,
      title: 'Воин Драконов',
      image: 'https://cdn.poehali.dev/projects/a314baa9-b207-42f5-b91a-c7404aebbed6/files/458fe90f-fad0-440c-9e41-9a13ef1910e4.jpg',
      progress: '24 / 24',
      episodes: 24,
      rating: 4.7,
      genre: 'Фэнтези',
      status: 'completed',
      reviews: [
        { id: 4, user: 'Екатерина', rating: 5, text: 'Лучшее аниме этого сезона! Обязательно к просмотру.', date: '2024-01-08' }
      ]
    }
  ]);

  const categories = [
    { id: 'all', label: 'Все', count: animeList.length },
    { id: 'watching', label: 'Смотрю', count: animeList.filter(a => a.status === 'watching').length },
    { id: 'planned', label: 'В планах', count: animeList.filter(a => a.status === 'planned').length },
    { id: 'completed', label: 'Просмотрено', count: animeList.filter(a => a.status === 'completed').length }
  ];

  const filteredAnime = animeList.filter(anime => {
    const matchesSearch = anime.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || anime.status === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddReview = () => {
    if (!selectedAnime || !newReview.text.trim()) return;

    const updatedAnime = { ...selectedAnime };
    updatedAnime.reviews.push({
      id: Date.now(),
      user: 'Вы',
      rating: newReview.rating,
      text: newReview.text,
      date: new Date().toISOString().split('T')[0]
    });

    setAnimeList(animeList.map(a => a.id === updatedAnime.id ? updatedAnime : a));
    setSelectedAnime(updatedAnime);
    setNewReview({ rating: 5, text: '' });
  };

  const renderStars = (rating: number, interactive: boolean = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            disabled={!interactive}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Icon
              name="Star"
              size={16}
              className={star <= rating ? 'fill-primary text-primary' : 'text-muted-foreground'}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-2xl font-bold text-primary">АнимеПортал</h1>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Icon name="User" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Settings" size={20} />
              </Button>
            </div>
          </div>
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск аниме..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              className={`flex-shrink-0 ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary border-border'
              }`}
            >
              {category.label}
              <Badge variant="secondary" className="ml-2 bg-background/20">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredAnime.map((anime, index) => (
            <Card
              key={anime.id}
              className="group cursor-pointer overflow-hidden border-border bg-card hover:border-primary transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedAnime(anime)}
            >
              <div className="relative aspect-[2/3] overflow-hidden">
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex items-center gap-1 mb-1">
                    <Icon name="Star" size={14} className="fill-primary text-primary" />
                    <span className="text-sm font-semibold text-white">{anime.rating}</span>
                  </div>
                  <p className="text-xs text-gray-300 mb-1">{anime.progress}</p>
                </div>
              </div>
              <CardContent className="p-3">
                <h3 className="font-semibold text-sm mb-1 line-clamp-2">{anime.title}</h3>
                <Badge variant="secondary" className="text-xs">
                  {anime.genre}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAnime.length === 0 && (
          <div className="text-center py-12">
            <Icon name="SearchX" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </div>

      <Dialog open={!!selectedAnime} onOpenChange={() => setSelectedAnime(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
          {selectedAnime && (
            <>
              <DialogHeader>
                <div className="flex gap-4 mb-4">
                  <img
                    src={selectedAnime.image}
                    alt={selectedAnime.title}
                    className="w-32 h-48 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <DialogTitle className="text-2xl mb-2">{selectedAnime.title}</DialogTitle>
                    <DialogDescription className="space-y-2">
                      <div className="flex items-center gap-2">
                        {renderStars(selectedAnime.rating)}
                        <span className="font-semibold">{selectedAnime.rating}</span>
                      </div>
                      <p className="text-foreground">
                        <span className="font-medium">Прогресс:</span> {selectedAnime.progress}
                      </p>
                      <p className="text-foreground">
                        <span className="font-medium">Жанр:</span> {selectedAnime.genre}
                      </p>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Icon name="MessageSquare" size={20} />
                    Отзывы ({selectedAnime.reviews.length})
                  </h3>

                  {selectedAnime.reviews.length > 0 ? (
                    <div className="space-y-3 mb-4">
                      {selectedAnime.reviews.map((review) => (
                        <Card key={review.id} className="bg-secondary border-border">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="font-semibold">{review.user}</p>
                                <p className="text-xs text-muted-foreground">{review.date}</p>
                              </div>
                              {renderStars(review.rating)}
                            </div>
                            <p className="text-sm">{review.text}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm mb-4">Пока нет отзывов. Станьте первым!</p>
                  )}

                  <div className="bg-secondary rounded-lg p-4 space-y-3">
                    <h4 className="font-medium">Добавить отзыв</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Ваша оценка:</span>
                      {renderStars(newReview.rating, true, (rating) => setNewReview({ ...newReview, rating }))}
                    </div>
                    <Textarea
                      placeholder="Поделитесь своими впечатлениями..."
                      value={newReview.text}
                      onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                      className="bg-background border-border"
                      rows={3}
                    />
                    <Button onClick={handleAddReview} className="w-full bg-primary hover:bg-primary/90">
                      <Icon name="Send" size={16} className="mr-2" />
                      Отправить отзыв
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
