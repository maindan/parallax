export function Highlights() {
  const photos: string[] = [
    "man.jpg",
    "window.jpg",
    "brut.jpg",
    "desert.jpg",
    "arch.jpg",
  ];

    return (
        <div className="w-full h-[120vh] sm:h-[140vh] pt-[20vh] sm:pt-[40vh]">
            <div className="w-full flex items-center justify-center mb-4">
                <span className="text-white text-5xl sm:text-6xl text-center">
                HIGHLIGHTS
                </span>
            </div>
            <div className="flex h-full w-full overflow-x-auto gap-4 px-10 scrollbar-hidden">
                {photos.map((photo: string, i: number) => (
                <div
                    key={i}
                    className="min-w-[90%] w-[90%] sm:min-w-[30%] sm:w-[30%] h-[70%] sm:h-[60%] flex items-center justify-center overflow-hidden shadow-lg bg-black hover:scale-[1.02] transition-all ease-in-out my-auto sm:m-0"
                >
                    <img
                    src={photo}
                    alt=""
                    className="w-full h-full object-cover object-center"
                    />
                </div>
                ))}
            </div>
        </div>
    );
}
