import React from 'react';
import SimpleForm from "../SimpleForm/SimpleForm";
import  {client} from '../../clients/client'
import {dark} from "../../styles/colors";
import {useAsync} from "../../hooks/useAsync";
import GifGrid from "../GifGrid/GifGrid";

const GifSearcher = props => {
    const {data, error, run, isLoading, isError, isSuccess} = useAsync();
    const [query, setQuery] = React.useState();
    const [queried, setQueried] = React.useState(false);

    React.useEffect(() => {
        if (!queried) {
            return
        }
        run(client(encodeURIComponent(query)))
    }, [query, queried, run]);

    function handleSearchSubmit({search}) {
        console.log(search)
        setQueried(true);
        setQuery(search);
    }

    return (
        <div>
            <SimpleForm onSubmit={handleSearchSubmit} buttonText={'Search Gif'} inputText={'search a gif'} inputName={'search'} isLoading={isLoading}/>

            {isError ? (
                <div css={{color: dark}}>
                    <p>There was an error:</p>
                    <pre>{error.message}</pre>
                </div>
                ) : null
            }

            {isSuccess  ?
                <GifGrid gifs={data.data}/> : Error
            }
        </div>
    );
};


export default GifSearcher;
