import React, { useState } from 'react';

export const FilterMenu = ({ setShowFilteredResults, filter, maxValue }) => {
    const [minPriceSlider, setMinPriceSlider] = useState(0);
    const [maxPriceSlider, setMaxPriceSlider] = useState(maxValue);
    const [inputStep, setInputStep] = useState(2000);

    const handleMinPriceSlider = e => {
        if (maxPriceSlider !== 0) {
            const newMinPrice = Math.min(e.target.value, (Number(maxPriceSlider) - 2000));
            setMinPriceSlider(newMinPrice);
            e.target.value = newMinPrice;
        } else {
            setMinPriceSlider(0);
        }
    }

    const handleMaxPriceSlider = e => {
        const newMaxPrice = Math.max(e.target.value, (Number(minPriceSlider) + 2000));
        e.target.value = newMaxPrice;
        setMaxPriceSlider(newMaxPrice);
    }

    const handleMinPriceInput = e => {
        if (maxPriceSlider !== 0) {
            const newMinPrice = Math.min(e.target.value, (Number(maxPriceSlider) - 2000));
            setMinPriceSlider(newMinPrice);
        } else {
            setMinPriceSlider(0);
        }
    }

    const handleMaxPriceInput = e => {
        const newMaxPrice = Math.max(e.target.value, (Number(minPriceSlider) + 2000));
        setMaxPriceSlider(newMaxPrice);
    }

    const handlePriceFilter = () => {
        filter(minPriceSlider, maxPriceSlider);
    }

    const cleanFilters = () => {
        setShowFilteredResults(false);
    }

    return (
        <div className="filter-container">
            <div className="text-dark">
                <p className="my-2">Rango de precios</p>
                <div className="row d-flex justify-content-between">
                    <div className="col-4">
                        <div className="d-flex my-2 col-12">
                            <label htmlFor="customRange1" className="d-none form-label">Rango mínimo</label>
                            <input type="range" onChange={handleMinPriceSlider} className="form-range" value={minPriceSlider} min="0" max="198000" step={inputStep} id="customRange1"></input>
                        </div>
                        <div className="col-12 d-flex justify-content-between">
                            <span className="azul-oscuro my-auto">De:</span>
                            <input
                                type="number"
                                className="w-75 bg-white border-primary border my-1"
                                style={{ width: "100px" }}
                                onChange={handleMinPriceInput}
                                id="minPriceSliderInfo"
                                min="0"
                                step={inputStep}
                                max="198000"
                                value={minPriceSlider} />
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="d-flex my-2 col-12">
                            <label htmlFor="customRange2" className="d-none form-label">Rango maximo</label>
                            <input type="range" onChange={handleMaxPriceSlider} className="form-range" value={maxPriceSlider} min="2000" max="200000" step={inputStep} id="customRange2"></input>
                        </div>
                        <div className="col-12 d-flex justify-content-between">
                            <span className="azl-osucuro my-auto">Hasta:</span>
                            <input
                                type="number"
                                className="w-75 bg-white border-primary border my-1"
                                style={{ width: "100px" }}
                                onChange={handleMaxPriceInput}
                                id="maxPriceSliderInfo"
                                min="2000"
                                step={inputStep}
                                max="200000"
                                value={maxPriceSlider} />
                        </div>
                    </div>
                    <div className='col-12 col-sm-2'>
                        <button className="btn bg-azul-oscuro text-white col-12 my-1" onClick={handlePriceFilter}>
                            Ordenar
                        </button>
                        <button className="btn btn-secondary text-white col-12 my-1" onClick={cleanFilters}>
                            Limpiar
                        </button>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
    );
}