import { Parallax } from 'react-parallax';
import Imagethree from '../../../assets/photo-1583454110551-21f2fa2afe61.avif'

const ImageThree = () => (
    <Parallax className='image' bgImage={Imagethree}  strength={800}>
        <div className='content'>
            <span className='img-txt'>
            Transform Your Fitness Journey with ExerciseXpert
            </span>
        </div>
    </Parallax>
);

export default ImageThree;