

const AdsSroll = () => {
  return (
    <section className="relative h-[145px] overflow-hidden bg-yellow-50 border-b-[1.25px] border-black">
      <div className="absolute w-full animate-scrollAds flex flex-col items-center">
        <p className="text-3xl font-lato font-bold">
          🚀 You could see your ad here
        </p>

        <button className="mt-4 px-6 py-2 bg-black text-white rounded-lg">
          Contact us
        </button>
      </div>
    </section>
  );
};

export default AdsSroll;