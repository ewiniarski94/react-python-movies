import Swal from 'sweetalert2';

export const confirmDelete = async (title) => {
    return Swal.fire({
        title: `Really delete "${title}"?`,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    });
};