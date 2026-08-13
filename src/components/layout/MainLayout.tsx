import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import EditorPanel from './EditorPanel';
import PreviewPanel from './PreviewPanel';

const MainLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-[1440px] mx-auto px-4 py-6">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-2">
                        <Sidebar />
                    </div>
                    <div className="col-span-5">
                        <EditorPanel />
                    </div>
                    <div className="col-span-5">
                        <PreviewPanel />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
