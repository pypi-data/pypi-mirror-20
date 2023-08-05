CREATE TABLE large ( 
    node_id   INTEGER PRIMARY KEY AUTOINCREMENT
                      NOT NULL,
    parent_id INTEGER DEFAULT 'NULL'
                      REFERENCES large ( node_id ) ON DELETE CASCADE
                                                   ON UPDATE CASCADE,
    l         INTEGER NOT NULL,
    r         INTEGER NOT NULL,
    value     INTEGER
);
CREATE TABLE [small] ([node_id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, [parent_id] INTEGER DEFAULT 'NULL' REFERENCES [small] ([node_id]) ON UPDATE CASCADE ON DELETE CASCADE, [l] INTEGER NOT NULL, [r] INTEGER NOT NULL, [name] TEXT);
CREATE INDEX large_l ON `large`(`l`);
CREATE INDEX large_parent_id ON `large`(`parent_id`);
CREATE INDEX large_r ON `large`(`r`);
CREATE INDEX small_l ON [small] ( l );
CREATE INDEX small_parent_id ON [small] ( parent_id );
CREATE INDEX small_r ON [small] ( r );
