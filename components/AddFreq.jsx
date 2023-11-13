"use client";
import React, { useState, useRef } from 'react';
import { useRouter } from "next/navigation";

import { TextField, Button, Paper, Typography, Container, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const AddFreq = () => {
    const [frequency_to, setFrequency_to] = useState('');
    const [frequency_fm, setFrequency_fm] = useState('');
    const [channel_spacing, setChannel_spacing] = useState('');
    const [frequency_type, setfrequency_type] = useState('');

    const router = useRouter();
    const formRef = useRef();

    const [options] = useState([
        // { value: '1', label: 'Select Frequency Band Type' },
        { value: '1', label: 'VHF' },
        { value: '2', label: 'HF' },
        { value: '3', label: 'UHF-Band I' },
        { value: '4', label: 'UHF-Band II' },
        { value: '5', label: 'UHF-Band III' },

    ]);

    const handleSelectChange = (e) => {
        setfrequency_type(e.target.value);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();


        console.log('inside handle submit function');

        function calculateFrequencyBands(fromFrequency, to, spacing, frequencyType, power) {
            const frequencyBands = [];
            for (let freq = fromFrequency; freq <= to; freq += spacing) {
                const frequencyBand = {
                    frequency_type: frequencyType,
                    frequency_channel: freq, // Assuming the frequency channel field represents the actual frequency
                    user_email: null, // You can fill in these fields with appropriate values
                    user_latitude: null,
                    user_longitude: null,
                    power,
                };
                frequencyBands.push(frequencyBand);
            }
            return frequencyBands;
        }

        try {
            console.log('Starting to calculate frequency bands...');
            console.log('frequency_type :', frequency_type);

            // if (frequency_type === '1') {
            //     setChannel_spacing('0.025');
            // }
            // else if (frequency_type === '2') {
            //     setChannel_spacing('0.010');
            // }
            // else if (frequency_type === '3') {
            //     setChannel_spacing('0.025');
            // }
            // else if (frequency_type === '4') {
            //     setChannel_spacing('0.125');
            // }
            // else if (frequency_type === '5') {
            //     setChannel_spacing('0.125');
            // }
            console.log('channel_spacing :', channel_spacing);
            const fromFrequency = parseFloat(frequency_fm);
            const toFrequency = parseFloat(frequency_to);
            const spacing = parseFloat(channel_spacing);
            console.log('spacing :', spacing);
            const power = 1;
            const frequencyBands = calculateFrequencyBands(fromFrequency, toFrequency, spacing, frequency_type, power);
            console.log('displaying frequency bands to be added');
            console.log(frequencyBands);

            const res = await fetch("api/addfreq", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    frequencyBands
                }),
            });
            console.log('checking res.ok');
            console.log(res.ok);
            if (res.ok) {

                const form = e.target;
                form.reset();
                router.push("addfreq");
            } else {
                console.log("Adding frequency band failed.");
            }
        }
        catch (error) {
            console.log("Adding frequency band failed: ", error);
        }
    };



    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
                <Typography variant="h5">Add Frequency Bands</Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 20 }}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Frequency Band Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={frequency_type}
                                label="Select Frequency Band Type"
                                onChange={handleSelectChange}
                            >
                                {options.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <TextField
                        label="Frequency From (MHz)"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="Text"
                        value={frequency_fm}
                        onChange={(e) => setFrequency_fm(e.target.value)}
                        required
                    />
                    <TextField
                        label="Frequency To (MHz)"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="Text"
                        value={frequency_to}
                        onChange={(e) => setFrequency_to(e.target.value)}
                        required
                    />

                    <TextField
                        label="Channel Spacing (Mhz)"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="Text"
                        value={channel_spacing}
                        onChange={(e) => setChannel_spacing(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 20 }}>
                        Add frequency Band
                    </Button>
                </form>
            </Paper>
        </Container>
    );

};

export default AddFreq;
