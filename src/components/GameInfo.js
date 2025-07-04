import React from 'react';

function GameInfo() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Piece Guide</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="font-semibold text-red-600 mb-2">Red Pieces (紅方)</h4>
          <div className="space-y-1">
            <div><span className="font-bold text-red-600">帥</span> - General (King)</div>
            <div><span className="font-bold text-red-600">仕</span> - Advisor</div>
            <div><span className="font-bold text-red-600">相</span> - Elephant</div>
            <div><span className="font-bold text-red-600">馬</span> - Horse</div>
            <div><span className="font-bold text-red-600">車</span> - Chariot</div>
            <div><span className="font-bold text-red-600">炮</span> - Cannon</div>
            <div><span className="font-bold text-red-600">兵</span> - Soldier</div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Black Pieces (黑方)</h4>
          <div className="space-y-1">
            <div><span className="font-bold text-gray-800">將</span> - General (King)</div>
            <div><span className="font-bold text-gray-800">士</span> - Advisor</div>
            <div><span className="font-bold text-gray-800">象</span> - Elephant</div>
            <div><span className="font-bold text-gray-800">馬</span> - Horse</div>
            <div><span className="font-bold text-gray-800">車</span> - Chariot</div>
            <div><span className="font-bold text-gray-800">砲</span> - Cannon</div>
            <div><span className="font-bold text-gray-800">卒</span> - Soldier</div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-2">Quick Rules</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Generals stay in the palace (3×3 area)</li>
          <li>• Elephants cannot cross the river</li>
          <li>• Horses can be blocked by adjacent pieces</li>
          <li>• Cannons capture by jumping over pieces</li>
          <li>• Soldiers gain sideways movement after crossing river</li>
        </ul>
      </div>
    </div>
  );
}

export default GameInfo;