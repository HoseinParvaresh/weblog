import Navbar from "@/components/modules/Navbar/Navbar";
import Header from "@/components/templates/Home/Header/Header";
import Posts from "@/components/templates/Home/Posts/posts";
import Sidebar from "@/components/templates/Home/Sidebar/Sidebar";
export default function Home() {
	return (
		<>
			<Navbar />
			<Header />
			<div className="container flex justify-evenly">
				<Posts />
        <Sidebar/>
			</div>
		</>
	);
}
