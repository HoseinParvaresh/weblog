import Header from "@/components/templates/Home/Header/Header";
import Posts from "@/components/templates/Home/Posts/Posts";
import Sidebar from "@/components/templates/Home/Sidebar/Sidebar";
import Navbar from "@/components/modules/Home/Navbar/Navbar";
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
