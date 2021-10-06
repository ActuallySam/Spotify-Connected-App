import { useEffect, useState } from 'react';
import { catchErrors } from '../utils';
import { getCurrentUserPlaylists } from '../spotify';
import { SectionWrapper, PlaylistsGrid } from '../components';
import axios from 'axios';

const Playlists = () => {
    const [playlistsData, setPlaylistsData] = useState(null);
    const [playlists, setPlaylists] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const userPlaylists = await getCurrentUserPlaylists();
            setPlaylistsData(userPlaylists.data);
        };

        catchErrors(fetchData());
    }, []);

    useEffect(() => {
        if (!playlistsData)
            return;

        // Playlist endpoint only returns 20 playlists at a time, so we need to make sure that we get ALL playlists by fetching the next set of Playlists

        const fetchMoreData = async () => {
            if (playlistsData.next) {
                const { data } = await axios.get(playlistsData.next);
                setPlaylistsData(data);
            }
        };

        // Use functional update to update playlists state variable to avoid including playlists as a dependency for this hook and creating an infinite loop

        setPlaylists(playlists => ([
            ...playlists ? playlists : [],
            ...playlistsData.items
        ]));

        catchErrors(fetchMoreData());

    }, [playlistsData]);

    return (
        <main>
            <SectionWrapper title="Playlists" breadcrumb="true">
                {playlists && (
                    <PlaylistsGrid artists={playlists} />
                )}
            </SectionWrapper>
        </main>
    );
}

export default Playlists;