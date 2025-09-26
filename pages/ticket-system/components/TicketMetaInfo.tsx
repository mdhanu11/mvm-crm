interface Props {
    createdBy: string;
    assignedTo: string;
    collaborators: string[];
    department:string;
  }
  
  const TicketMetaInfo = ({ createdBy, assignedTo, collaborators,department }: Props) => (
    <div className="flex items-center flex-wrap gap-4 text-sm">
      <div className="flex items-center gap-1">
        <span className="text-gray-500">Created by:</span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-sm bg-green-50 text-green-700 border border-green-200">{createdBy}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-gray-500">Assigned to:</span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-sm bg-purple-50 text-purple-700 border border-purple-200">{assignedTo}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-gray-500">Department:</span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-sm bg-yellow-50 text-yellow-700 border border-yellow-200">{department}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-gray-500">Contributors:</span>
        <div className="flex flex-wrap gap-1">
          {collaborators.length > 0 ? (
            collaborators.map((name) => (
              <span key={name} className="inline-flex items-center px-2 py-0.5 rounded-full text-sm bg-blue-50 text-blue-700 border border-blue-200">{name}</span>
            ))
          ) : (
            <span className="text-sm text-gray-500 italic">No contributors yet</span>
          )}
        </div>
      </div>
    </div>
  );
  
  export default TicketMetaInfo;
  