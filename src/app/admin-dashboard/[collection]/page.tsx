import { DataTable } from "../../../components/templates/admin-dashboard/DataTable/DataTable";

export default function page() {
    return (
        <div dir="ltr" className="bg-white px-5 py-3 rounded-lg">
            <DataTable/>
        </div>
    );
}

// export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch(`https://.../data`)
//     const data = await res.json()
   
//     // Pass data to the page via props
//     return { props: { data } }
//   }