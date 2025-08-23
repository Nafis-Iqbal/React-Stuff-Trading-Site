import { isTagArray, isCommentArray } from "../../Utilities/Utilities"

import LoadingSpinner from "../PlaceholderComponents/LoadingAnimationDiv";
import TagListRow from "./TagListRow";
import { CommentRow } from "./CommentRow";
import { NoContentTableRow } from "../PlaceholderComponents/NoContentDiv";

interface TableBlockProps<T>{
    dataList: T[];
    isDataLoading: boolean;
    dataFetchMessage: string;
    noContentColSpan?: number;
    onDataUpdate?: (data: any) => void;
    onDataDelete?: (id: number) => void;
    onClickNavigate?: (id: number) => void;
}

export const TableDataBlock = <T extends {id: number}>({dataList, dataFetchMessage, noContentColSpan, onDataUpdate, onDataDelete, onClickNavigate, isDataLoading} : TableBlockProps<T>) => {    
    if(isDataLoading){
        return (
            <tr>
                <td colSpan={noContentColSpan? noContentColSpan: 4}>
                  <LoadingSpinner/>
                </td>
            </tr>
        );
    }
    
    if(dataList && dataList.length > 0)
    {
        if(isCommentArray(dataList) && onDataDelete)
        {
            return (
                <>
                    {(dataList as Comments[]).map((data) => (
                        <CommentRow key={data.id} comment_id={data.id} commentText={data.comment} onDelete={() => onDataDelete(data.id)}/>
                    ))}
                </>
            );
        }
        else if(isTagArray(dataList) && onDataUpdate && onDataDelete)
        {
            return (
                <>
                    {(dataList as Tag[]).map((data) => (
                        <TagListRow key={data.id} tag={data} onUpdate={(tag: Tag) => onDataUpdate(tag)} onDelete={() => onDataDelete(data.id)}/>
                    ))}
                </>
            );
        }
        else{
            return (
                <div>{dataFetchMessage}</div>
            );
        }
    }
    else
    {
        //Table will be empty, due to network error, or empty list
        return (
            <>
                <NoContentTableRow displayMessage={dataFetchMessage} tdColSpan={noContentColSpan? noContentColSpan: 1}/>
            </>
        );
    }
}