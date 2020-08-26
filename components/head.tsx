import Head from 'next/head'

const HeadComponent: React.FC = () => {
    return (
        <Head>
            <title>Weather App</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}

export default HeadComponent;