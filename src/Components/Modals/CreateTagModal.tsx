import { useState, useEffect } from 'react';

import { useCreateTagRQ } from '../../Services/API/TagApi';
import { queryClient } from "../../Services/API/ApiInstance";

const CreateTagModal: React.FC<CreateTagModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    onSuccess,
    onFailure
}) => {

    const[formData, setFormData] = useState<Tag>({
        id:0,
        title: ''
    });

    const {mutate: createTaskTagMutate} = useCreateTagRQ(
        (responseData) => {
            if(responseData.data.status === "success")
            {
                onSuccess(formData);
                queryClient.invalidateQueries(["tags"]);

                setFormData({
                    id: 0,
                    title: ''
                });
            }
            else{
                onFailure();
            }
        },
        () => {
            onFailure();
        }
    ); 

    useEffect(() => {

    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const{name, value} = e.target;
      
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === 'end_date' ? new Date(value) : value,
      }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit();
        
        createTaskTagMutate(formData);
        onClose();
    }

    const handleClose = () => {
        setFormData({
          id: 0,
          title: ''
        });

        onClose();
    }

    if (!isOpen) return null;

    return(
        <div className="fixed inset-0 -top-4 flex justify-center items-center bg-gray-800 bg-opacity-50 backdrop-blur-sm z-50">
            <div className="bg-pink-200 rounded-lg p-6 shadow-lg w-full max-w-lg">
                <h2 className="text-2xl text-pink-800 font-semibold mb-4">Create Tag</h2>
    
                <form onSubmit={(e) => handleSubmit(e)}> {/* Delegate form submission to parent */}
                    {/* Task Title */}
                    <div className="mb-4">
                    <label htmlFor="title" className="block mb-3 text-base md:text-lg font-medium text-gray-700">
                        Tag Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-4 py-2 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    </div>
        
                    {/* Submit Button */}
                    <div className="flex justify-between">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-emerald-400 text-white rounded-md hover:bg-emerald-500"
                    >
                        Create Tag
                    </button>
                    </div>
                </form>          
            </div>
        </div>
    );
}

export default CreateTagModal;