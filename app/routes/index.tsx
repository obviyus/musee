import images from '~/images';
import Masonry from 'react-masonry-css'
import { Link } from "@remix-run/react";
import { motion } from "framer-motion"

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
                Object.entries(images).map(([name, image], index) => {
                    return <motion.div
                        key={ index }
                        whileInView={ { opacity: 1 } }
                        viewport={ { once: true } }
                        initial={ { opacity: 0 } }
                        transition={ {
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: index * 0.05,
                        } }
                    >
                        <Link prefetch={ 'intent' } to={ `/image/${ name }` } key={ name }>
                            <img src={ `${ image.thumbnail }` }
                                 key={ name }
                                 alt={ name }
                                 title={ name }
                                 width={ image.width }
                                 height={ image.height }
                                 loading={ index > 4 ? 'lazy' : 'eager' }
                                 className={ 'transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-300' }
                            />
                        </Link>
                    </motion.div>
                })
            }
        </Masonry>
    );
}