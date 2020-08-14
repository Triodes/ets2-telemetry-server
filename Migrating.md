# Migrating from Telemetry Server 3.2.5 to 4.x.x

| 3.2.5 Property (CSS Class) | 4.x.x Property (CSS Class) | Comments |
|----------------------------|----------------------------|----------|
| trailer-attached           | trailer#-attached          | |
| trailer-name               | cargo-cargo                | trailer.name is now the name of the trailer itself; not the cargo inside the trailer |
| trailer-mass               | cargo-mass                 | |
| trailer-wear               | N/A                        | Trailers are now split between trailer.wearWheels and trailer.wearChassis |


Determining if the player is currently hauling a job is easier now, by simply using `job.jobMarket !== ''` instead of looking for an attached trailer, 
which can be detached mid-journey.