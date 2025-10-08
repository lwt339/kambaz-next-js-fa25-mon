export default function House() {

    const house = {
        bedrooms: 4,
        bathrooms: 2.5,
        squareFeet: 2000,
        address: {
            street: "Via Roma",
            city: "Roma",
            state: "RM",
            zip: "00100",
            country: "Italy",
        },
        owners: ["Alice", "Bob"],
    };


    console.log('House object:', house);

    return (
        <div id="wd-house" className="mb-4">
            <h4>House</h4>

                <div className="row">
                    <div className="col-md-6">
                        <h5>bedrooms</h5> {house.bedrooms}
                        <h5>bathrooms</h5> {house.bathrooms}

                    </div>

                </div>
                <h5>Data</h5>
                <pre className="bg-light p-2">{JSON.stringify(house, null, 2)}</pre>

            <hr/>
        </div>
    );
}