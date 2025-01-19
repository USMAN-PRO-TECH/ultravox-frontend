import toast from 'react-hot-toast';

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      duration: 4000,
      position: 'top-right',
      className: 'bg-green-500',
      style: {
        background: '#10B981',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
      },
    });
  },
  
  error: (message: string) => {
    toast.error(message, {
      duration: 4000,
      position: 'top-right',
      className: 'bg-red-500',
      style: {
        background: '#EF4444',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
      },
    });
  },
  
  warning: (message: string) => {
    toast(message, {
      duration: 4000,
      position: 'top-right',
      icon: '⚠️',
      style: {
        background: '#F59E0B',
        color: '#fff',
      },
    });
  },

  loading: (message: string) => {
    return toast.loading(message, {
      position: 'top-right',
      className: 'bg-blue-500',
      style: {
        background: '#3B82F6',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
      },
    });
  },
}; 