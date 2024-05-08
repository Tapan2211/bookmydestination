import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import Home from "../component/Pages/Home/Home";
import Reservation from '../component/Pages/Reservation/Reservation';
import Place from "../component/Pages/Place/Place";
import AdventureDetail from "../component/Pages/AdventureDetail/AdventureDetail";
import About from '../component/Pages/About/about';

function RoutesData() {
    return (
        <div>
            <Router>
                <div>
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route path='/reservation' element={<Reservation />} />
                        <Route path='/place/:id' element={<Place />} />
                        <Route path='/details/:id' element={<AdventureDetail />} />
                        <Route path='/about' element={<About />} />
                    </Routes>
                </div>
            </Router>

        </div>
    )
}

export default RoutesData;