import React from 'react'
import './SearchPage.css'
import { useStateValue } from './StateProvider'
import useGoogleSearch from './useGoogleSearch';
import Response from './response';
import GoogleLogo from './images/google_logo.png'
import Search from './Search';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import DescriptionIcon from '@material-ui/icons/Description';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import RoomIcon from '@material-ui/icons/Room';
import MorVertIcon from '@material-ui/icons/MoreVert';


const SearchPage = () => {

    const [{term}, dispatch] = useStateValue();

    // Live API CALL
    const { data } = useGoogleSearch(term);

    // const data = Response;

    // MOCK API CALL
    console.log(data)

    return (
        <div className="searchPage">
            <div className="searchPage__header">
                <Link to="/">
                    <img src={GoogleLogo} className="searchPage__logo" alt="google logo"/>
                </Link>
                <div className="searchPage__headerBody">
                    <Search hideButtons />

                    <div className="searchPage__options">
                        <div className="searchPage__optionsLeft">
                            <div className="searchPage__option">
                                <SearchIcon />
                                <Link to="/">All</Link>
                            </div>
                            <div className="searchPage__option">
                                <DescriptionIcon />
                                <Link to="/">News</Link>
                            </div>
                            <div className="searchPage__option">
                                <LocalOfferIcon />
                                <Link to="/">Shopping</Link>
                            </div>
                            <div className="searchPage__option">
                                <RoomIcon />
                                <Link to="/">Maps</Link>
                            </div>
                            <div className="searchPage__option">
                                <MorVertIcon />
                                <Link to="/">More</Link>
                            </div>

                        </div>
                        <div className="searchPage__optionsRight">
                            <div className="searchPage__option">
                                <Link to="/settings">Settings</Link>
                            </div>
                            <div className="searchPage__option">
                                <Link to="/tools">Tools</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {true && (
                <div className="searchPage__results">
                    <p className="searchPage__resultCount">
                        About {data?.searchInformation.formattedTotalResults} results ({data?.searchInformation.formattedSearchTime} seconds) for {data?.queries.request[0].searchTerms}
                    </p>

                    {data?.items.map(item => (
                        <div className="searchPage__result">
                            <a className="searchPage__resultLink" href={item.link}>
                                {item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src && (
                                    <img className="searchPage__resultImage" src={item.pagemap?.cse_image.length > 0 && item.pagemap?.cse_image[0]?.src} alt="search image" />
                                )}
                                {item.displayLink}
                            </a>

                            <a className="searchPage__resultTitle" href={item.link}>
                                <h2>{item.title}</h2>
                            </a>

                            <p className="searchPage__resultSnippet">{item.snippet}</p>
                        </div>
                    ))}

                </div>
            )}
        </div>
    )
}

export default SearchPage
