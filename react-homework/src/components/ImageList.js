import '../styles/ImageList.css';

function ImageList({ images }) {
  return (
    <div className="image-grid">
      {images.map((image) => {
        return (
          <img
            key={image.title + image.id}
            src={image.thumbnailUrl}
            style={{ width: '100px' }}
          />
        );
      })}
    </div>
  );
}

export default ImageList;
