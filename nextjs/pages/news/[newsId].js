import { useRouter } from "next/router";

function detailPage() {
    const router = useRouter();
    const { newsId } = router.query;
    return (<h1>News for {newsId} city is yet to arrive..!!!</h1>)
}

export default detailPage;