"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
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
    const [bandsToDelete,setBandsToDelete] = useState([]);
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

    // useEffect(() => {
    //     async function fetchData2() {
    //         const bandDataArray = [];
    //         for (const bandId of bands) {
    //             try {
    //                 const response = await axios.get(`/api/bandinfo?bandId=${bandId.bandId}`);
    //                 console.log('response obtained is: ');
    //                 console.log(response.data);

    //                 const bandWithLabel = {
    //                     ...response.data,
    //                     frequency_type: frequencyTypeLabels[response.data.frequency_type],
    //                 };

    //                 // console.log('band with label is: ', bandWithLabel);
    //                 bandDataArray.push(bandWithLabel);
    //             } catch (error) {
    //                 console.error(`Error fetching data for band ID ${bandId.bandId}:`, error);
    //             }
    //         }

    //         setBandData(bandDataArray);
    //     }

    //     fetchData2();
    // }, [bands]);


    const handleSelectRow = (bandId) => {
        console.log('bandId of selected row is : ', bandId);
        if (session) {
            try {
                if (!Array.isArray(bandsToDelete)) {
                    setBandsToDelete([]);
                }
                if (bandsToDelete.includes(bandId)) {
                    const index = bandsToDelete.indexOf(bandId);
                    if (index !== -1) {
                        bandsToDelete.splice(index, 1);
                    }
                } else {

                    bandsToDelete.push(bandId);
                }
                setBandsToDelete([...bandsToDelete]);

            } catch (error) {
                console.error(error);
            }
        }
        console.log('bands selected for deletion are : ', bandsToDelete);
    };
 

    


    const handleSubmit = async () => {
        console.log('session : ',session);
        const tempBands = bandsToDelete;
        console.log('stringified bands : ',JSON.stringify(tempBands));
        console.log('bandsToDelete.length : ',bandsToDelete.length);
        if (bandsToDelete.length > 0) {
            try {
                console.log('inside try block of deleting bands');
                const response = await fetch(`/api/deletebands?bandIds=${bandsToDelete.join(',')}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                setBands((prevBands) => {
                    return prevBands.filter((band) => !bandsToDelete.includes(band._id));
                });
                
                setBandsToDelete([]); 
                
            if (response.ok) {
                // Success: Status code is in the range 200-299
                const data = await response.json();
                console.log('Deletion response:', data);
              // Clear the selected bands
            } else {
                // Handle errors
                console.error('Error deleting bands:', response.statusText);
            }

        } catch (error) {
            console.error('Error deleting bands:', error);
        }
            }
           
    };



    const isRowSelected = (bandId) => Array.isArray(bandsToDelete) && bandsToDelete.includes(bandId);

    const handleFrequencyTypeChange = (event) => {
        const selectedType = event.target.value;
        console.log('selected type is : ', selectedType);
        setSelectedFrequencyType(frequencyTypeLabels[selectedType] || '');
    };



    const filteredBands = selectedFrequencyType
        ? bands.filter((band) => band.frequency_type === selectedFrequencyType)
        : bands;



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
                           <TableCell>Band</TableCell>
                            <TableCell>Frequency (Mhz)</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>User Location</TableCell>
                            <TableCell>Power (W)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredBands.map((band) => (
                            <TableRow key={band._id}>
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
            {/* <Box mt={2} display="flex" justifyContent="center">
                <button onClick={handleSubmit}>Submit</button>
            </Box> */}
            <Button onClick={handleSubmit} size="small" sx={{ margin: '80px auto 0', display: 'block' }}>Delete Bands</Button>
        </div>
    );
}
