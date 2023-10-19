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

export default function FrequencyBands() {


    const [bands, setBands] = useState([]);
    const [selectedFrequencyType, setSelectedFrequencyType] = useState('');
    const [selectedRows, setSelectedRows] = useState([]); // State to store selected rows
    const { data: session } = useSession();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/reqfreq'); // Replace with your API endpoint

                // Map the received data to use the labels for frequency_type
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

    const handleSelectRow = (bandId) => {
        if (session) {
            const currentUserId = session.user.id;
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(bandId)) {
                // return prevSelectedRows.filter((id) => id !== bandId);
                const { [bandId]: removed, ...newSelection } = prevSelectedRows;
                // Send a DELETE request to the backend to disassociate the user from the band
                axios.delete('/api/bandselection', { data: { userId: currentUserId, bandId } });
                return newSelection;
            } else {
                axios.post('/api/bandselection', { userId: currentUserId, bandId });
                return [...prevSelectedRows, bandId];
            }
        });
    }
    };

    const isRowSelected = (bandId) => selectedRows.includes(bandId);

    // Function to handle changing the selected frequency type
    const handleFrequencyTypeChange = (event) => {
        const selectedType = event.target.value;
        setSelectedFrequencyType(frequencyTypeLabels[selectedType]);
    };

    // Filter the bands based on the selected frequency type
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
