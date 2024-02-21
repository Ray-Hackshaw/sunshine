export const BackgroundVideo = () => {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      controls={false}
      disableRemotePlayback
    >
      <source src="/isohel.mp4" type="video/mp4" />
    </video>
  );
};
