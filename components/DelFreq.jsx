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

export default function DeleteFrequencyBands() {
    const [bands, setBands] = useState([]);
    const [selectedFrequencyType, setSelectedFrequencyType] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [bandData, setBandData] = useState([]); // Initialize with an empty array
    const { data: session } = useSession();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/deletebands');
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

    console.log('bands to del: ', bands);

    useEffect(() => {
        async function fetchData2() {
            const bandDataArray = [];
            for (const bandId of bands) {
                try {
                    const response = await axios.get(`/api/bandinfo?bandId=${bandId.bandId}`);
                    console.log('response obtained is: ');
                    console.log(response.data);

                    const bandWithLabel = {
                        ...response.data,
                        frequency_type: frequencyTypeLabels[response.data.frequency_type],
                    };

                    // console.log('band with label is: ', bandWithLabel);
                    bandDataArray.push(bandWithLabel);
                } catch (error) {
                    console.error(`Error fetching data for band ID ${bandId.bandId}:`, error);
                }
            }

            setBandData(bandDataArray);
        }

        fetchData2();
    }, [bands]);

    console.log('band data : ',bandData);

    const handleSelectRow = async (bandId) => {
        console.log('session value');
        console.log(session);
        setBandData((prevBandData) => {
            if (!Array.isArray(prevBandData)) {
                prevBandData = [];
            }
            if (Array.isArray(prevBandData) && prevBandData.some((band) => band._id === bandId)) {
                // Send a DELETE request to the backend to disassociate the user from the band using fetch
                fetch('/api/deletebands', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ bandId }),
                });
                return prevBandData.filter((band) => band._id !== bandId);
            }
            return prevBandData;
        });
    };

    const isRowSelected = (bandId) => Array.isArray(selectedRows) && selectedRows.includes(bandId);

    const handleFrequencyTypeChange = (event) => {
        const selectedType = event.target.value;
        console.log('selected type is : ', selectedType);
        setSelectedFrequencyType(frequencyTypeLabels[selectedType]);
    };



    const filteredBands = selectedFrequencyType
        ? bandData.filter((band) => band.frequency_type === selectedFrequencyType)
        : bandData;

    

    return (
        <div>
            <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                <Typography variant="h3">Delete Frequency Bands</Typography>
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
                            <TableCell>Frequency Type</TableCell>
                            <TableCell>Frequency From</TableCell>
                            <TableCell>Frequency To</TableCell>
                            <TableCell>Channel Spacing</TableCell>
                            <TableCell>Select Band</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredBands.map((band) => (
                            <TableRow key={band._id}>
                                <TableCell>{band.frequency_type}</TableCell>
                                <TableCell>{band.frequency_fm}</TableCell>
                                <TableCell>{band.frequency_to}</TableCell>
                                <TableCell>{band.channel_spacing}</TableCell>
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
