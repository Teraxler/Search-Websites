import SearchBar from "../../components/SearchBar/SearchBar";
import Footer from "../../components/Footer/Footer";
import Logo from "../../components/Logo/Logo";

export default function MainPage() {
  return (
    <>
      <header className="h-15.5"></header>
      <main className="flex flex-col justify-center items-center">
        <Logo className="my-9.5 w-50 xs:w-60 sm:w-auto" />
        {/* SearchBar */}
        <div className="flex flex-col items-center w-full px-5">
          <SearchBar />
        </div>
      </main>
      <Footer className="fixed bottom-0 left-0 right-0" />
    </>
  );
}
