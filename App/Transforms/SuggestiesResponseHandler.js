const transform = response => {
    const formattedData = response.data.map((suggestie) => {
        return ({
            id: suggestie.id,
            title: suggestie.acf.titel,
            latitude: parseFloat(suggestie.acf.coords_lat),
            longitude: parseFloat(suggestie.acf.coords_lon),
            type: suggestie.acf.type,
            description: suggestie.acf.beschrijving,
            address: suggestie.acf.adres,
        });
    });

    return formattedData;
}

export default transform
