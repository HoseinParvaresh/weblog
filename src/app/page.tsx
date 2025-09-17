import Header from "@/components/home/header/Header";
import Posts from "@/components/home/posts/Posts";
import Sidebar from "@/components/home/sidebar/Sidebar";
import Navbar from "@/components/home/navbar/Navbar";
export default function Home() {
	return (
		<>
			<Navbar />
			<Header />
			<div className="container flex justify-evenly px-4 pt-7">
				<Posts />
				<Sidebar />
			</div>
		</>
	);
}
