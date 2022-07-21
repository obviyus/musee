import images from 'public/index';
import Masonry from 'react-masonry-css'
import { Link } from "@remix-run/react";

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};

export default function Index() {
    return (
        <Masonry
            breakpointCols={ breakpointColumnsObj }
            className={ 'flex' }
            columnClassName=""
        >
            {
                Object.entries(images).map(([name, image]) => {
                    return <Link prefetch={ 'intent' } to={ `/image/${ name }` } key={ name }>
                        <img src={ image.thumbnail }
                             key={ name }
                             alt={ name }
                             title={ name }
                             width={ image.width }
                             height={ image.height }
                             loading={ 'lazy' }
                             className={ 'transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-300' }
                        />
                    </Link>
                })
            }
        </Masonry>
    );
}
