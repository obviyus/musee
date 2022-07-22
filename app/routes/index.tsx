import images from '~/images';
import Masonry from 'react-masonry-css'

const breakpointColumnsObj = {
    default: 2,
    3000: 5,
    2500: 5,
    2000: 4,
    1500: 3,
    1000: 2,
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
                    return <a href={ `/image/${ name }` } key={ name }>
                        <img src={ image.thumbnail }
                             key={ name }
                             alt={ name }
                             title={ name }
                             width={ image.width }
                             height={ image.height }
                             loading={ 'lazy' }
                             className={ 'transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-300' }
                        />
                    </a>
                })
            }
        </Masonry>
    );
}
