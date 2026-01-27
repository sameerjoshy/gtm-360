import React from 'react';

const LiveFeed = ({ runs }) => {
    if (!runs || runs.length === 0) {
        return (
            <div className="text-center py-20 bg-slate-50 rounded-lg border border-slate-200 border-dashed">
                <h3 className="text-lg font-medium text-slate-900">No active missions running</h3>
                <p className="text-slate-500">Start a new mission above to see live agent logs.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {runs.map((run) => (
                <div key={run.id} className="bg-white border boundary-l-4 border-slate-200 p-4 rounded shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${getStatusColor(run.status)}`}></div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-bold text-slate-900">{run.domain}</h4>
                            <p className="text-sm text-slate-500">Target: {run.persona}</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getStatusBadge(run.status)}`}>
                                {run.status}
                            </span>
                            <span className="text-xs text-slate-400 mt-1">{run.time}</span>
                        </div>
                    </div>
                    {/* Log Snippet */}
                    <div className="mt-3 bg-slate-900 rounded p-2 text-xs font-mono text-green-400 overflow-hidden truncate">
                        {'>'} {run.lastLog}
                    </div>
                </div>
            ))}
        </div>
    );
};

const getStatusColor = (status) => {
    switch (status) {
        case 'RUNNING': return 'bg-indigo-500';
        case 'COMPLETE': return 'bg-green-500';
        case 'FAILED': return 'bg-red-500';
        default: return 'bg-slate-300';
    }
};

const getStatusBadge = (status) => {
    switch (status) {
        case 'RUNNING': return 'bg-indigo-100 text-indigo-700';
        case 'COMPLETE': return 'bg-green-100 text-green-700';
        case 'FAILED': return 'bg-red-100 text-red-700';
        default: return 'bg-slate-100 text-slate-600';
    }
};

export default LiveFeed;
