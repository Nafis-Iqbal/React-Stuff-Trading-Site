import React, { useState, useEffect } from 'react';

import { queryClient } from '../../Services/API/ApiInstance';
import { TagApi } from '../../Services/API';
import { useGlobalUI } from '../../Hooks/StateHooks/GlobalStateHooks';

import { TableDataBlock } from '../ElementComponents/TableDataBlock';
import CreateTagModal from '../Modals/CreateTagModal';

const TagManagerModule:React.FC<{customStyle?: string}> = ({customStyle}) => {
    const [tagsData, setTagsData] = useState<Tag[]>([]);
    const [tagsFetchMessage, setTagsFetchMessage] = useState<string>("");
    const [isCreateTagOpen, setIsCreateTagOpen] = useState(false);
    const {showLoadingContent, openNotificationPopUpMessage} = useGlobalUI();

    const {data: tagsDataAll, isLoading: tagsDataLoading} = TagApi.useGetAllTagsRQ(
        () => {
            if(tagsDataAll?.data.data.length < 1){
                setTagsFetchMessage("No tags to show.");
            }
        },
        () => {
            setTagsFetchMessage("Failed to Load tags.");
        },
        true
    );

    const {mutate: updateTagMutate} = TagApi.useUpdateTagRQ(
        () => {
            showLoadingContent(false);
            openNotificationPopUpMessage("Tag updated successfully.");

            queryClient.invalidateQueries(["tags"]);
        },
        () => {
            showLoadingContent(false);
            openNotificationPopUpMessage("Failed to update tag. Try again");
        }
    );

    const {mutate: deleteTagMutate} = TagApi.useDeleteTagRQ(
        () => {
            showLoadingContent(false);
            openNotificationPopUpMessage("Tag deleted successfully.");

            queryClient.invalidateQueries({ queryKey: ["tags"] });
        },
        () => {
            showLoadingContent(false);
            openNotificationPopUpMessage("Failed to delete tag. Try again");
        }
    );

    useEffect(() => {
        setTagsData(tagsDataAll?.data.data);
    }, [tagsDataAll])

    const openCreateTagForm = () => {
        setIsCreateTagOpen(true);
    }

    const onCreateTagSubmit = () => {
        showLoadingContent(true);
    }

    const onCreateTagSuccess = (formData: Tag) => {
        showLoadingContent(false);

        openNotificationPopUpMessage("Tag created successfully!");

        if(tagsData){
            setTagsData((prevTags) => [
                ...prevTags,
                {
                id: formData.id, // Generate a new task ID
                title: formData.title,
                }
            ]);
        }
    }

    const onCreateTagFailure = () => {
        showLoadingContent(false);
        openNotificationPopUpMessage("Error creating task tag!");
    }

    return (
        <div id="tag_section" className={`relative flex flex-col justify-left items-center ${customStyle}`}>
            <h1 className="text-pink-800 pl-3 py-2 font-bold text-lg md:text-xl">Tag Manager</h1>

            <CreateTagModal
                isOpen={isCreateTagOpen}
                onClose={() => setIsCreateTagOpen(false)}
                onSubmit={onCreateTagSubmit}
                onSuccess={onCreateTagSuccess}
                onFailure={onCreateTagFailure}
            />

            <table className="w-full border-collapse space-y-1">
            <thead>
                <tr className="bg-pink-400 w-[100%]">
                    <th className="px-4 py-2 w-[20%] rounded-tl-sm">Tag Title</th>
                    <th className="px-4 py-2 w-[30%]">Edit</th>
                    <th className="px-4 py-2 w-[10%]"></th>
                    <th className="px-4 py-2 w-[20%]">Actions</th>
                    <th className="px-4 py-2 w-[20%] rounded-tr-sm">
                        <button className='p-2 mx-2 bg-emerald-400 hover:bg-emerald-500 text-sm md:text-base text-white rounded-sm' onClick={() => openCreateTagForm()}>Create New Tag</button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <TableDataBlock
                dataList={tagsData}
                isDataLoading={tagsDataLoading}
                dataFetchMessage={tagsFetchMessage}
                noContentColSpan={5}
                onDataUpdate={(tag: Tag) => updateTagMutate(tag)}
                onDataDelete={(id: number) => deleteTagMutate(id)}
                />
            </tbody>
            </table>
        </div>
    );
}

export default TagManagerModule;