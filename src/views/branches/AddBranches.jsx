import React from 'react';
import { Drawer, Box, Typography, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const BranchDrawer = ({ open, branch, onClose }) => {
    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 400, padding: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{branch ? 'Branch Details' : 'Add Branch'}</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {branch ? (
                    <Box mt={2}>
                        <Typography variant="body1">
                            <strong>Name:</strong> {branch.name}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Location:</strong> {branch.location}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Created At:</strong> {branch.createdAt ? new Date(branch.createdAt).toLocaleString() : 'N/A'}
                        </Typography>
                        {/* Other branch details or actions */}
                    </Box>
                ) : (
                    // Render a form for adding a branch if needed
                    <Box mt={2}>
                        <Typography variant="body1">Branch form goes here</Typography>
                    </Box>
                )}
            </Box>
        </Drawer>
    );
};

export default BranchDrawer;
