<table
            className="table-auto w-full overflow-scroll border-none"
            style={{ height: "76vh" }}
          >
            <thead>
              <tr className="bg-slate-400 h-20">
                <th className="px-4 py-2 text-xl">Date</th>
                <th className="px-4 py-2 text-xl">Status</th>
                <th className="px-4 py-2 text-xl">Time</th>
                <th className="px-4 py-2 text-xl">Project</th>
                <th className="px-4 py-2 text-xl">Project Subcode</th>
                <th className="px-4 py-2 text-xl">Activity</th>
                <th className="px-4 py-2 text-xl">Location</th>
                {/* <th className="px-4 py-2 text-xl">Bill</th> */}
                <th className="px-4 py-2 text-xl">Comment</th>
                <th className="px-4 py-2 text-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-sky-200 text-center">
              {masterData.length > 0 && currentWeek.map((day, index) => (
                <React.Fragment key={index}>
                  <tr
                    key={index}
                    className={
                      day.isCurrentDay
                        ? "bg-yellow-200"
                        : day.isHoliday
                          ? "bg-red-200"
                          : ""
                    }
                  >
                    <td className="px-4 py-2 font-bold">
                      {day.date} <br />
                      {day.dayName}
                    </td>
                    <td
                      className={`px-4 py-2 font-bold ${day.status === "Saved" ? "text-red-500" : ""
                        }`}
                    >
                      {masterData[index].status.statusName}
                    </td>

                    <td className="px-4 py-2 text-2xl">
                      <div>
                        {/* {editableRows[index] ? (
                          <TimeSelector
                            value={masterData[index].hours}
                            onChange={(e) => handleTimeChange(index, e)}
                          />
                        ) : (
                          <span onClick={() => handleEditClick(index)}>
                            {`${day.time.hours}:${day.time.minutes}`}
                          </span>
                        )} */}
                        {curEditRow !== null && index === curEditRow && currentWeekNo === currentWeekNumber ? <><select
                          name="hours"
                          value={Math.trunc(masterData[index].hours)}
                          // onChange={onChange}
                          className="text-center rounded px-2 py-1 mx-1 w-22"
                        >
                          {[...Array(12).keys()].map((hour) => (
                            <option key={hour} value={hour}>
                              {hour}
                            </option>
                          ))}
                        </select>
                          <span>:</span>
                          <select
                            name="minutes"
                            value={parseInt(masterData[index].hours.toString().split(".")?.[1])}
                            // onChange={onChange}
                            className="text-center rounded px-2 py-1 mx-1 w-22"
                          >
                            {[...Array(60).keys()].map((minute) => (
                              <option key={minute} value={minute}>
                                {minute}
                              </option>
                            ))}
                          </select></> : masterData[index].hours}
                      </div>
                    </td>

                    <td className="px-4 py-2 text-2xl">
                      <div>
                        {curEditRow !== null && index === curEditRow && currentWeekNo === currentWeekNumber ? (
                          // <Dropdown
                          //   options={retPros()}
                          //   name="project"
                          //   value={masterData[index].project.projectID}
                          //   onChange={(e) => handleTimeChange(index, e)}
                          // />
                          <select
                            name="project"
                            onChange={(e) => handleProSelection(e, index)}
                            className="border rounded px-2 py-1"
                            value={masterData[index].project.projectID}
                          >
                            <option value="">Select</option>
                            {allProCompData.map((obj) => {
                              const projectKey = Object.keys(obj)[0];
                              const project = obj[projectKey];
                              const projectID = project.projectID;
                              const projectName = project.projectName;
                              return (
                                <option key={projectID} value={projectID}>
                                  {projectName}
                                </option>
                              );
                            })}
                          </select>
                        ) : (
                          masterData[index].project.projectName
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-2 text-2xl">
                      <div>
                        {curEditRow !== null && index === curEditRow && currentWeekNo === currentWeekNumber ? (
                          // <Dropdown
                          //   // options={retPros()}
                          //   name="projectsubcode"
                          //   value={masterData[index].projectsubcode.id}
                          //   onChange={(e) => handleTimeChange(index, e)}
                          // />
                          <select
                            name="projectSubcode"
                            onChange={(e) => handleProSelection(e, index)}
                            className="border rounded px-2 py-1"
                            value={masterData[index].project.projectID}
                          >
                            <option value="">Select</option>
                            {allProCompData.map((obj) => {
                              const projectKey = Object.keys(obj)[0];
                              const project = obj[projectKey];
                              const projectID = project.projectID;
                              const projectName = project.projectName;
                              return (
                                <option key={projectID} value={projectID}>
                                  {projectName}
                                </option>
                              );
                            })}
                          </select>
                        ) : (
                          masterData[index].projectsubcode.projectSubcode
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-2 text-2xl">
                      <div>
                        {curEditRow !== null && index === curEditRow && currentWeekNo === currentWeekNumber ? (
                          // <Dropdown
                          //   options={["", " 123", "234", " 345"]}
                          //   name="Activity"
                          //   value={masterData[index].project_subcode_activity.id}
                          //   className="text-black"
                          //   onChange={(e) => handleTimeChange(index, e)}
                          // />
                          <select
                            name="projectSubcodeActivity"
                            onChange={(e) => handleProSelection(e, index)}
                            className="border rounded px-2 py-1"
                            value={masterData[index].projectsubcode.projectID}
                          >
                            <option value="">Select</option>
                            {allProCompData.map((obj) => {
                              const projectKey = Object.keys(obj)[0];
                              const project = obj[projectKey];
                              const projectID = project.projectID;
                              const projectName = project.projectName;
                              return (
                                <option key={projectID} value={projectID}>
                                  {projectName}
                                </option>
                              );
                            })}
                          </select>
                        ) : (
                          masterData[index].project_subcode_activity.name
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-2 text-2xl">
                      <div>
                        {curEditRow !== null && index === curEditRow && currentWeekNo === currentWeekNumber ? (
                          // <Dropdown
                          //   options={["", "Office", "WFH", "Onsite"]}
                          //   name="location"
                          //   value={masterData[index].location}
                          //   onChange={(e) => handleTimeChange(index, e)}
                          // />
                          <select
                            name="project"
                            // onChange={onChange}
                            className="border rounded px-2 py-1"
                            value={masterData[index].location}
                          >
                            <option value="">
                              Select
                            </option>
                            {["Office", "WFH", "Onsite"].map((loc) => (
                              <option key={loc} value={loc}>
                                {loc}
                              </option>
                            ))};
                          </select>
                        ) : (
                          masterData[index].location
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-2xl">
                      <div>
                        {curEditRow !== null && index === curEditRow && currentWeekNo === currentWeekNumber ? (
                          <textarea
                            name="comment"
                            value={masterData[index].comment}
                            onChange={(e) => handleTimeChange(index, e)}
                            className="rounded px-2 py-1"
                          />
                        ) : (
                          masterData[index].comment
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-2 flex justify-between">
                      <button
                        onClick={() => setCurEditRow(index)}
                        className="mb-4 bg-lime-400 w-12 items-center flex justify-items-center text-center text-2xl text-black gap-2 p-2 h-12 hover:bg-lime-700  font-bold py-2 px-4 rounded"
                      >
                        <CiEdit />
                      </button>
                      <button
                        onClick={() => addNewRowBelow(index)}
                        className="mb-4 bg-lime-400 w-12 items-center flex justify-items-center text-center text-2xl text-black gap-2 p-2 h-12 hover:bg-lime-700  font-bold py-2 px-4 rounded"
                      >
                        +
                      </button>
                      {currentWeek.length > 1 && (
                        <button
                          onClick={() => deleteRow(index)}
                          className="mb-4 bg-red-300 w-12 items-center flex justify-items-center text-center gap-2 p-2 h-12 hover:bg-red-600 text-2xl text-black font-bold py-2 px-4 rounded"
                        >
                          −
                        </button>
                      )}
                      <button
                        onClick={() => saveRow(index)}
                        className="mb-4 bg-orange-400 w-16 items-center flex justify-items-center text-center gap-2 p-2 h-12 hover:bg-orange-700  text-black font-bold py-2 px-4 rounded"
                      >
                        Save
                      </button>

                      {/* <button
                        onClick={() => handleEditClick(index)}
                        className="mb-4 bg-blue-400 w-16 items-center flex justify-items-center text-center gap-2 p-2 h-12 hover:bg-blue-700  text-black font-bold py-2 px-4 rounded"
                      >
                        Edit
                      </button> */}
                      {/* <button
                        onClick={() => handleFreeze(index)}
                        className="mb-4 bg-blue-400  items-center flex justify-items-center text-center gap-2 p-2 h-12 hover:bg-blue-700 text-2xl text-black font-bold py-2 px-4 rounded"
                      >
                        <TbFreezeRow />
                      </button> */}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>