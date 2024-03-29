import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import {IoExpandOutline } from 'react-icons/io5';
import {useState} from "react";

interface ImgGalleryProps {
    gallery: any[];
}

const ImageLightBox: React.FC<ImgGalleryProps> = ({gallery}) => {
    const [isOpen, setIsOpen] = useState(false);

    const slidesGallery = gallery?.map((image) => {
        return {
            src: image.image
        }
    });

    
    return (
        <div className={`mb-10 h-0`}>
            <button type="button" onClick={() => setIsOpen(true)}>
                <IoExpandOutline className="text-3xl"  />
            </button>

            {isOpen && (
                <Lightbox
                    open={isOpen}
                    close={() => setIsOpen(false)}
                    slides={slidesGallery}
                    plugins={[Captions, Fullscreen, Slideshow, Thumbnails, Video, Zoom]}
                />
            )}
        </div>
    );
};

export default ImageLightBox;
