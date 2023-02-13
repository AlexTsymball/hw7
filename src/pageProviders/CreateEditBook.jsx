import React from 'react';
import PageAccessValidator from 'components/PageAccessValidator';
import PageContainer from 'components/PageContainer';
import CreateEditBookPage from "../pages/CreateEditBook";

const CreateEditBook = () => (
    <PageAccessValidator>
        <PageContainer>
            <CreateEditBookPage/>
        </PageContainer>
    </PageAccessValidator>
);

export default CreateEditBook;
