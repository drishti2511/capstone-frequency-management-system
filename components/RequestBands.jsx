"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { TextField, Button } from '@mui/material';
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
    const [frequencyFrom, setFrequencyFrom] = useState(''); // Input field for frequency from
    const [frequencyTo, setFrequencyTo] = useState('');     // Input field for frequency to
    const [numberOfBandsRequired, setNumberOfBandsRequired] = useState(0);

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
                console.log('resposne obtained about already used bands', response);
                // const bandIds = response.data.map((item) => item.bandId);
                const bandIds = response.data;
                console.log(bandIds);
                setOverallSelectedBands(bandIds);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const handleRangeAndBandsSubmit = () => {
        const fromFrequency = parseFloat(frequencyFrom);
        const toFrequency = parseFloat(frequencyTo);
        try {
            const availableBands = bands.filter((band) => {
                const bandFrequency = parseFloat(band.frequency_channel);
                return bandFrequency >= fromFrequency && bandFrequency <= toFrequency &&  band.frequency_type === selectedFrequencyType;
            });
    
            const filteredBands = availableBands.filter((band) => {
                return !isRowSelected(band._id);
            });
    
            const selectedBands = filteredBands.length < numberOfBandsRequired
            ? filteredBands
            : filteredBands.slice(0, numberOfBandsRequired);
            
            for (const band of selectedBands) {
                handleSelectRow(band._id);
            }
        }catch (error) {
            console.error(error);
        }
    };

    const handleSelectRow = async (bandId) => {
        if (session) {
            const currentUserId = session.user.email;
            const location = 'temporary_location';
            const userId = currentUserId;
            console.log('session value');
            console.log(session);
            try {
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
                setSelectedRows([...selectedRows]);

            } catch (error) {
                console.error(error);
            }
        }

        try {
            const response = await axios.get('/api/bandselection');
            console.log('resposne obtained about already used bands', response);
            const bandIds = response.data.map((item) => item.bandId);
            setOverallSelectedBands(bandIds);
        } catch (error) {
            console.error(error);
        }
    };

    console.log('overall selected bands : ', overallSelectedBands);

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
            <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                <TextField
                    label="Frequency From (MHz)"
                    value={frequencyFrom}
                    onChange={(e) => setFrequencyFrom(e.target.value)}
                />
                <TextField
                    label="Frequency To (MHz)"
                    value={frequencyTo}
                    onChange={(e) => setFrequencyTo(e.target.value)}
                />
                <TextField
                    label="Number of Bands Required"
                    type="number"
                    value={numberOfBandsRequired}
                    onChange={(e) => setNumberOfBandsRequired(parseInt(e.target.value, 10))}
                />
                <Button variant="contained" color="primary" onClick={handleRangeAndBandsSubmit}>
                    Get Bands
                </Button>
            </Box>
            <p style={{
                textAlign: 'center', // Center align the text
                fontSize: '24px',     // Increase the font size
                marginTop: '20px',    // Add top margin
                marginBottom: '20px'  // Add bottom margin
            }}>
                Select Manually
            </p>
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
