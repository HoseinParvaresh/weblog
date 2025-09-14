import { Button } from "@/components/ui/button"

export default function Header() {
	return (
		<div className="container flex justify-between bg-[#36454F] text-white py-15 px-60">
			{/* right => title , desc */}
			<div className="space-y-10 w-[506px]">
                {/* title */}
				<div className="font-MorabbaBold text-4xl space-y-8">
					<p>به ویرگول،</p>
					<p>دنیای کلمات خوش آمدید.</p>
				</div>
                {/* desc */}
				<p className=" leading-8">ویرگول بستری برای خواندن، گفت‌وگو درباره‌ی موضوعات مورد علاقه و به اشتراک‌گذاری ایده‌های اصیل و عمیق در زندگی شخصی، حرفه‌ای و اجتماعی است.</p>
			</div>
			{/* left */}
			<div className="flex flex-col justify-between items-center">
				<img src="/images/virgool-logo-1.svg" alt="logo-1" />
                <Button size={"sm"} className="rounded-full bg-sky-700 text-xs hover:bg-sky-800">شروع به نوشتن </Button>
			</div>
		</div>
	);
}
