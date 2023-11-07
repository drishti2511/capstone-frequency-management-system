"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox'; // Import Checkbox
import { useSession } from 'next-auth/react';


// Define the frequency type labels
const frequencyTypeLabels = {
    '1': 'VHF',
    '2': 'HF',
    '3': 'UHF-Band I',
    '4': 'UHF-Band II',
    '5': 'UHF-Band III',
};


const availableRowStyle = { backgroundColor: 'rgba(0, 255, 0.5, 0.8)' };
const selectedRowStyle = { backgroundColor: 'rgba(255, 0, 0, 0.5)' };


export default function FrequencyBands() {


    const [bands, setBands] = useState([]);
    const [selectedFrequencyType, setSelectedFrequencyType] = useState('');
    const [selectedRows, setSelectedRows] = useState([]); // State to store selected rows
    const [overallSelectedBands, setOverallSelectedBands] = useState([]);
    const { data: session } = useSession();


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/reqfreq');
                const bandsWithLabels = response.data.map((band) => ({
                    ...band,
                    frequency_type: frequencyTypeLabels[band.frequency_type],
                }));

                setBands(bandsWithLabels);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);




    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/bandselection');
                console.log('resposne obtained about already used bands',response);
                // const bandIds = response.data.map((item) => item.bandId);
                const bandIds  = response.data;
                console.log(bandIds);
                setOverallSelectedBands(bandIds);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);


    const handleSelectRow = async (bandId) => {
        if (session) {
            const currentUserId = session.user.email;
            const location = 'temporary_location';
            const userId = currentUserId;
            console.log('session value');
            console.log(session);
            try {
                // if (selectedRows.includes(bandId)) {
                //     // If the bandId is already in the array, remove it
                //     const index = selectedRows.indexOf(bandId);
                //     if (index !== -1) {
                //         selectedRows.splice(index, 1);
                //     }
                //     const newuserId = null;
                //     const newlocation = null;
                //     await fetch('/api/bandselection', {
                //         method: 'PUT',
                //         headers: {
                //             'Content-Type': 'application/json',
                //         },
                //         body: JSON.stringify({bandId, newuserId, newlocation}),
                //     });
                // } else {
                    console.log('user_id=', currentUserId);
                    console.log('band_id=', bandId);
                    console.log('posting request');
                    await fetch(`/api/bandselection`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ bandId, userId, location }),
                    });
    
                    selectedRows.push(bandId);
                // }
    
                setSelectedRows([...selectedRows]);
            } catch (error) {
                console.error(error);
            }
        }

        try {
            const response = await axios.get('/api/bandselection');
            console.log('resposne obtained about already used bands',response);
            const bandIds = response.data.map((item) => item.bandId);
            setOverallSelectedBands(bandIds);
        } catch (error) {
            console.error(error);
        }
    };

    console.log('overall selected bands : ',overallSelectedBands);

    const isRowSelected = (bandId) => {
        return (
            (Array.isArray(selectedRows) && selectedRows.includes(bandId)) || overallSelectedBands.includes(bandId)
        );
    };



    const handleFrequencyTypeChange = (event) => {
        const selectedType = event.target.value;
        setSelectedFrequencyType(frequencyTypeLabels[selectedType]);
    };


    const filteredBands = selectedFrequencyType
        ? bands.filter((band) => band.frequency_type === selectedFrequencyType)
        : bands;

    return (
        <div>
            <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                <Typography variant="h3">Frequency Bands Available</Typography>
            </Box>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 240 }}>
                <InputLabel id="demo-simple-select-standard-label">Select Frequency Type</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectedFrequencyType}
                    onChange={handleFrequencyTypeChange}
                    label="Select Frequency Type"
                >
                    <MenuItem value="">All Frequency Types</MenuItem>
                    {Object.keys(frequencyTypeLabels).map((key) => (
                        <MenuItem key={key} value={key}>
                            {frequencyTypeLabels[key]}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>

                            <TableCell>Band</TableCell>
                            <TableCell>Frequency (Mhz)</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>User Location</TableCell>
                            <TableCell>Power (W)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredBands.map((band) => (
                            <TableRow
                                key={band._id}
                                style={
                                    isRowSelected(band._id)
                                        ? selectedRowStyle
                                        : availableRowStyle
                                }
                            >
                                <TableCell>{band.frequency_type}</TableCell>
                                <TableCell>{band.frequency_channel}</TableCell>
                                <TableCell>{band.user_email || '-'}</TableCell>
                                <TableCell>{band.user_location || '-'}</TableCell>
                                <TableCell>{band.power}</TableCell>
                                <TableCell>
                                    <Checkbox
                                        checked={isRowSelected(band._id)}
                                        onChange={() => handleSelectRow(band._id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
