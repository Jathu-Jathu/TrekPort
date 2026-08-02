import { Helmet } from "react-helmet-async";

export default function MetaData({title}){
    return(
        <Helmet>
             <link rel="icon" href="https://img.icons8.com/?size=100&id=3CdGadNlwBQD&format=png&color=000000" />
            <title> TrekPort - Travel Management System </title>
        </Helmet>
    )
}