import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Grid,
    Typography
} from '@mui/material';
import { getBranches } from 'container/branchContainer/slice'; // adjust slice path if needed
import BranchDrawer from './AddBranches';
import { useTheme } from '@emotion/react';
import { formatDate } from 'utils/formateDate';

const BranchTable = () => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [selectedBranch, setSelectedBranch] = useState(null);
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const [searchField, setSearchField] = useState('name'); // assume branch has a name field

    useEffect(() => {
        dispatch(getBranches({}));
    }, [dispatch]);

    const branchListData = useSelector((state) => state.branch?.branchList || null);
    const branchList = branchListData?.data;

    const handleRowClick = (branch) => {
        setSelectedBranch(branch);
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        document.title = `Your App Name`;
        setDrawerOpen(false);
        setSelectedBranch(null);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage - 1);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchFieldChange = (event) => {
        setSearchField(event.target.value);
    };

    const filteredBranches = branchList?.filter((branch) => {
        const value = branch[searchField]?.toString().toLowerCase() || '';
        return value.includes(searchQuery.toLowerCase());
    });

    const paginatedBranches = filteredBranches?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Grid container justifyContent={'space-between'}>
                    <Grid item>
                        <FormControl
                            size="small"
                            variant="outlined"
                            sx={{
                                width: '120px',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderTopRightRadius: '0px',
                                    borderBottomRightRadius: '0px',
                                    borderRight: '0px'
                                },
                                '& .MuiOutlinedInput-root': {
                                    border: 'none',
                                    boxShadow: 'none'
                                }
                            }}
                        >
                            <InputLabel>Search</InputLabel>
                            <Select value={searchField} onChange={handleSearchFieldChange} label="Search By" fullWidth>
                                <MenuItem value="name">Branch Name</MenuItem>
                                <MenuItem value="location">Location</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            size="small"
                            placeholder="Search"
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderTopLeftRadius: '0px',
                                    borderBottomLeftRadius: '0px'
                                },
                                '& .MuiOutlinedInput-root': {
                                    border: 'none',
                                    boxShadow: 'none'
                                }
                            }}
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </Grid>
                </Grid>
            </div>

            {/* Table for displaying branches */}
            <TableContainer
                component={Paper}
                sx={{
                    height: 'calc(70vh - 40px)',
                    overflow: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '10px'
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: theme.palette.grey[100],
                        borderRadius: '10px'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#cfcccc',
                        borderRadius: '10px',
                        border: `2px solid ${theme.palette.grey[100]}`
                    }
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ minWidth: 80 }}>
                                SI No
                            </TableCell>
                            <TableCell align="center" sx={{ minWidth: 150 }}>
                                Branch Name
                            </TableCell>
                            <TableCell align="center" sx={{ minWidth: 150 }}>
                                Location
                            </TableCell>
                            <TableCell align="center" sx={{ minWidth: 150 }}>
                                Created At
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedBranches?.length ? (
                            paginatedBranches.map((branch, index) => (
                                <TableRow key={branch._id} hover onClick={() => handleRowClick(branch)} style={{ cursor: 'pointer' }}>
                                    <TableCell align="center" sx={{ minWidth: 80 }}>
                                        {index + 1 + page * rowsPerPage}
                                    </TableCell>
                                    <TableCell align="center" sx={{ minWidth: 150 }}>
                                        {branch.name}
                                    </TableCell>
                                    <TableCell align="center" sx={{ minWidth: 150 }}>
                                        {branch.location}
                                    </TableCell>
                                    <TableCell align="center" sx={{ minWidth: 150 }}>
                                        {branch.createdAt ? formatDate(branch.createdAt) : 'N/A'}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No branches found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Grid container display={'flex'} direction={'row'} justifyContent={'space-between'}>
                <Grid item>
                    <Typography p={3}>Showing {branchListData?.totalCount || 0} entries</Typography>
                </Grid>
                <Grid item>
                    <Pagination
                        count={Math.ceil((filteredBranches?.length || 0) / rowsPerPage)}
                        page={page + 1}
                        onChange={handleChangePage}
                        color="secondary"
                        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                    />
                </Grid>
            </Grid>

            {/* Drawer for Branch Details */}
            {isDrawerOpen && <BranchDrawer open={isDrawerOpen} branch={selectedBranch} onClose={closeDrawer} />}
        </>
    );
};

export default BranchTable;
