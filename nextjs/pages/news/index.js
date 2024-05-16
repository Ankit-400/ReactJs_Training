import Link from 'next/link'

function NewsPage() {
    return (
        <>
            <h1>The news page is here...!!</h1>

            <ul>
                <li><Link href='/news/surat'>Surat</Link></li>
                <li><Link href='/news/pbr'>Pbr</Link></li>
                <li><Link href='/news/rajnot'>Rajkot</Link></li>
            </ul>
        </>
    )
}

export default NewsPage;