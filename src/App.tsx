import { ReactNode, useState } from 'react';

type WithChildrenProps = {
  children: ReactNode;
}

function New(props: WithChildrenProps) {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            {props.children}
        </div>
    )
};

function Popular(props: WithChildrenProps) {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            {props.children}
        </div>
    )
};

function Article(props: { title: string;  views: number}) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
};

function Video(props: {url: string; views: number}) {
    return (
        <div className="item item-video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
};

function withViews <T extends { views: number }>(
  Component: React.ComponentType<T>
) {
  return function PopularOrNew(props: T) {
    if (props.views >= 1000) {
      return (
        <Popular>
          <Component {...props}/>
        </Popular>
      )
    };

    if (props.views < 100) {
      return (
        <New>
          <Component {...props}/>
        </New>
      )
    }
  }
}

const ArticleWithViews = withViews(Article);
const VideoWithViews = withViews(Video);

type ListItem = {
  type: 'video' | 'article';
  url?: string;
  title?: string;
  views: number;
}

type ListProps = {
  list: ListItem[];
}

function List(props: ListProps) {
    return props.list.map((item, index) => {
        switch (item.type) {
            case 'video':
                return (
                    <VideoWithViews key={index} url={item.url!} views={item.views} />
                );

            case 'article':
                return (
                    <ArticleWithViews key={index} title={item.title!} views={item.views} />
                );
        }
    });
};

export default function App() {
    const [list, setList] = useState<ListItem[]>([
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 12
        },
        {
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175
        },
        {
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 1532
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 4253
        },
        {
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 12,
        },
    ]);

    return (
        <List list={list} />
    );
}